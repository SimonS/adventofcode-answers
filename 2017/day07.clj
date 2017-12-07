(require '[clojure.string :as str])

(def example-input ["pbga (66)"
                    "ebii (61)" "havc (66)" "ktlj (57)" "fwft (72) -> ktlj, cntj, xhth"
                    "qoyq (66)" "padx (45) -> pbga, havc, qoyq" "tknk (41) -> ugml, padx, fwft"
                    "jptl (61)" "ugml (68) -> gyxo, ebii, jptl" "gyxo (61)" "cntj (57)"])

(def normalised-data
    (->> (slurp "2017/inputs/day07.txt")
            str/split-lines))

(defn debracket [s] (->> (drop-last s)
                         (apply str)
                         (#(subs % 1))
                         read-string))

(defn parse-disc [disc]
  (let [[disc deps] (str/split disc #"->")
        [name weight] (str/split disc #" ")]
    (merge
     {:name name :weight (debracket weight)}
     (when deps {:deps (map str/trim (filter not-empty (str/split deps #", ")))}))))

(defn find-bottom [l]
  (let [discs (map parse-disc l)
        discs-with-deps (->> discs
                             (filter :deps)
                             (map :name)
                             set)
        all-deps (->> discs
                      (filter :deps)
                      (mapcat :deps)
                      set)
        names (set (filter :name discs))]
    (clojure.set/difference discs-with-deps all-deps)))

; (find-bottom example-input)

; pt 1:
(find-bottom normalised-data)
